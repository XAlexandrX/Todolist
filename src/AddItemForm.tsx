
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {IconButton, TextField} from "@mui/material";

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
            <TextField
                size="small"
                variant="outlined"
                value={itemTitle}
                   onChange={changeItemTitleHandler}
                   onKeyUp={onKeyUpHandler}
                error={!!error}
                helperText={error}
            />

            <IconButton onClick={addItemHandler}>
                <AddCircleIcon/>
            </IconButton>
        </div>
    )

}


