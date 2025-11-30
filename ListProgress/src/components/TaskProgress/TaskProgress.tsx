import { TaskProgressContainer } from "./TaskProgress.styles"

export const TaskProgress = () => {
    return (
        <TaskProgressContainer progress={47}>
            <span>47%</span>
        </TaskProgressContainer>
    )
}
