import React, { useState } from 'react';
import AnswerModal from './AnswerModal';
import { MdOutlineQuestionAnswer } from "react-icons/md";
import './AnswerModal.css'
function ParentComponent({ questionId, question, onAnswerSubmit,name }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <button onClick={openModal}>
                <MdOutlineQuestionAnswer className='Answer' />
            </button>
            {isModalOpen && (
                <div className="modal-container">
                    <AnswerModal
                        question={question}
                        questionId={questionId}
                        onClose={closeModal}
                        onAnswerSubmit={onAnswerSubmit}
                        name={name}
                    />
                </div>
            )}
        </div>


    );
}

export default ParentComponent;
