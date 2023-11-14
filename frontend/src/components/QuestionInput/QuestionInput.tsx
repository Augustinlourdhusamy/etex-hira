import { useState } from "react";
import { Stack, TextField } from "@fluentui/react";
import { SendRegular } from "@fluentui/react-icons";
import Send from "../../assets/Send.svg";
import styles from "./QuestionInput.module.css";

interface Props {
    onSend: (question: string, id?: string) => void;
    disabled: boolean;
    placeholder?: string;
    clearOnSend?: boolean;
    conversationId?: string;
    enableInput:boolean;
}

export const QuestionInput = ({ onSend, disabled, placeholder, clearOnSend, conversationId, enableInput }: Props) => {
    const [question, setQuestion] = useState<string>("");

    const sendQuestion = () => {
        if (disabled || !question.trim()) {
            return;
        }

        if(conversationId){
            onSend(question, conversationId);
        }else{
            onSend(question);
        }

        if (clearOnSend) {
            setQuestion("");
        }
    };

    const onEnterPress = (ev: React.KeyboardEvent<Element>) => {
        if (ev.key === "Enter" && !ev.shiftKey) {
            ev.preventDefault();
            sendQuestion();
        }
    };

    const onQuestionChange = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        setQuestion(newValue || "");
    };

    const sendQuestionDisabled = disabled || !question.trim();

    return (
        <div>
            {
                enableInput ? (
                    <div className="d-flex align-items-center justify-content-center gap-2">

                        <TextField
                            placeholder={placeholder}
                            className={styles.formControl}
                            resizable={false}
                            borderless
                            value={question}
                            onChange={onQuestionChange}
                            onKeyDown={onEnterPress}
                        />
 
                        <button className={styles.goBtn}
                            onClick={sendQuestion}
                            onKeyDown={e => e.key === "Enter" || e.key === " " ? sendQuestion() : null}
                        >Go</button>
                    </div >
                ) : (
 
                    <Stack horizontal className={styles.questionInputContainer}>
                        <TextField
                            className={styles.questionInputTextArea}
                            placeholder={placeholder}
                            multiline
                            resizable={false}
                            borderless
                            value={question}
                            onChange={onQuestionChange}
                            onKeyDown={onEnterPress}
                        />
                        <div className={styles.questionInputSendButtonContainer}
                            role="button"
                            tabIndex={0}
                            aria-label="Ask question button"
                            onClick={sendQuestion}
                            onKeyDown={e => e.key === "Enter" || e.key === " " ? sendQuestion() : null}
                        >
                            {sendQuestionDisabled ?
                                <img src={Send} className={styles.questionInputSendButtonDisabled} />
                                :
                                <img src={Send} className={styles.questionInputSendButton} />
                            }
                        </div>
                        <div className={styles.questionInputBottomBorder} />
                    </Stack>
                )}
        </div>
 
    );
};
