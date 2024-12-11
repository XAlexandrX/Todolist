import {Button} from "./Button";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: AddItemFormPropsType) => {
    const [itemTitle, setItemTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value)
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    const addItemHandler = () => {
        if (itemTitle.trim() !== ""){
            addItem(itemTitle.trim());
            setItemTitle("")
        } else {
            setError("Field is required");
        }

    }

    return (
        <div>
            <input value={itemTitle}
                   onChange={changeItemTitleHandler}
                   onKeyUp={onKeyUpHandler}
                   className={error ? "error" : ""}
            />

            <Button onClick={addItemHandler} title="+"/>
            {error && <div className="error-message">{error}</div>}
        </div>
    )

}


