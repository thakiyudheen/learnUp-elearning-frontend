
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FcQuestions } from "react-icons/fc";
import { useAppDispatch, useAppSelector } from '@/hooks/hooke';
import { getAllAssessmentAction } from '@/redux/store/actions/assessment/getAllAssessment';
import ExamComplete from '../../../assets/enrollment/exam-completed.svg';
import { RootState } from '@/redux/store';
import { FiDownloadCloud } from "react-icons/fi";
import { generateCertificate } from '@/utils/generatePdf/generatePdf';
import { updateEnrollmentAction } from '@/redux/store/actions/enrollment/updateEnrollmentAction';

interface Option {
    id: string;
    text: string;
}

interface Question {
    _id: string;
    question: string;
    correctAnswer: string;
    options: Option[];
}

interface Assessment {
    _id: string;
    courseId: string;
    instructorId: string;
    questions: Question[];
}

const QuizComponent: React.FC = () => {
    const { data } = useAppSelector((state: RootState) => state.user)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [answers, setAnswers] = useState<any>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate= useNavigate();

    const handleOptionSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(e.target.value);
    };

    useEffect(() => {
        const getData = async () => {
            const response = await dispatch(getAllAssessmentAction({ courseId: location.state }));
            if (response.payload.success) {
                console.log()
                setQuestions(response.payload.data[0]?.questions || []);
            }
        };
        getData();
    }, [dispatch, location.state]);

    const handleNext = () => {
        setAnswers([
            ...answers,
            { questionId: questions[currentQuestionIndex]._id, selectedOption }
        ]);
        setSelectedOption('');
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    const currentQuestion = questions[currentQuestionIndex];

    const calculateScore =  () => {
        let correctAnswers = 0;
        answers.forEach((answer: any) => {
            const question = questions.find(q => q._id === answer.questionId);
            if (question && question.correctAnswer === answer.selectedOption) {
                correctAnswers++;
            }
        });
         if((correctAnswers / questions.length) * 100 >40){
            handleStatus()
           
         }
        return (correctAnswers / questions.length) * 100;

    };
    const handleStatus = async () =>{
        await dispatch(updateEnrollmentAction({courseId:location.state,userId:data?.data?._id}))
    }

    return (
        <div className="h-screen bg-gray-100 dark:bg-base-100 flex flex-col items-center p-5 w-full justify-center">
            <progress
                className="progress progress-info dark:progress-primary w-full max-w-xl"
                value={(currentQuestionIndex + 1).toString()}
                max={questions.length.toString()}
            ></progress>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-b-lg shadow-md w-full max-w-xl  p-6 mx-auto ">
                {currentQuestionIndex < questions.length ? (
                    <>
                        <div className="mb-6">
                            <div className="flex items-center mb-4 mt-[2rem] justify-center text-center">
                                <FcQuestions className="text-[30px]" />
                                <h2 className="text-xl font-semibold text-[20px] ml-3">{currentQuestion.question}</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-[2rem]">
                                {currentQuestion.options.map((option) => (
                                    <label key={option.id} className="block mb-2 p-2 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <input
                                            type="radio"
                                            name="option"
                                            value={option.text}
                                            checked={selectedOption === option.text}
                                            onChange={handleOptionSelect}
                                            className="mr-2 rounded-lg border border-gray-200"
                                        />
                                        {option.text}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="text-center flex justify-end">
                            <button
                                onClick={handleNext}
                                className={`mt-4 py-1 px-4 ${selectedOption ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} text-white rounded focus:outline-none`}
                                disabled={!selectedOption}
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center mt-6 ">
                        <h2 className="text-2xl font-semibold text-[20px]">Exam Completed Successfully</h2>
                        <p className={`mt-4 ${calculateScore() > 40 ? 'text-[green]' : 'text-[red]'}`}>Your Score: {calculateScore().toFixed(2)}%</p>
                        <div className='flex justify-center'>
                            <img src={ExamComplete} alt="" className='h-[15rem]' />
                        </div>
                        <div>
                            
                            {calculateScore() > 40 ? (
                                <button
                                    onClick={async() => {generateCertificate(data.data.firstName + ' ' + data.data.lastName, 'HTML', '14/07/2024')
                                       
                                    }}
                                    className='py-1 px-5 border border-blue-700 text-blue-700 rounded-lg hover:bg-blue-700 hover:text-white'
                                >
                                    Download Certificate
                                </button>

                            ) : (
                                <button onClick={() => {
                                    navigate('/student/view-video',{state:location.state})

                                }} className='py-1 px-5 border border-[red] text-[red] rounded-lg hover:bg-[red] hover:text-white'>
                                    Retry Exam
                                </button>
                            )}


                        </div>
                        <button onClick={() => {
                                    navigate('/student/view-video',{state:location.state})

                                }} className='border border-[red] text-[red] px-4 py-1 mt-3 rounded-lg'>
                                cancel
                            </button>

                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizComponent;
