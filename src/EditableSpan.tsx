import {useState} from "react";

type EditableSpanPropsType = {
    title: string
}

export const EditableSpan = ({title}:EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    return (
        editMode
            ? <input/>
            : <span>{title}</span>

    )
}