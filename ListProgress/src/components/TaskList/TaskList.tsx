import { ArrowBack, BodyList, BottomContainer, MidContainer, TopContainer, TaskCategory, TaskTitle, ItemList, IconsList, TextList } from './TaskList.styles.ts'
import type { TaskCardProps } from "../TaskCard/TaskCard";
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg'; 
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { AddBtn } from '../Utils/Buttons'
import { CheckInput } from '../Utils/Inputs'
import { TaskProgress } from "../TaskCard/TaskCard.styles.ts";

type TaskListProps = TaskCardProps & {
  onBack: () => void;
};

export const TaskList = ({ title, category, progress = 0, onBack }: TaskListProps) => {
    return (
        <BodyList>
            <TopContainer>
              <TaskCategory>{ category }</TaskCategory>
              <ArrowBack className="icon" onClick={onBack}/>
            </TopContainer>

            <TaskTitle>{ title }</TaskTitle>

            <MidContainer>
              <ItemList>
                <TextList> <CheckInput /> Guardar 10 reais</TextList>
                <IconsList>
                  <EditIcon className="icon" />
                  <TrashIcon className="icon" />
                </IconsList>
              </ItemList>
              <ItemList>
                <TextList> <CheckInput /> Guardar 10 reais</TextList>
                <IconsList>
                  <EditIcon className="icon" />
                  <TrashIcon className="icon" />
                </IconsList>
              </ItemList>
              <ItemList>
                <TextList> <CheckInput /> Guardar 10 reais</TextList>
                <IconsList>
                  <EditIcon className="icon" />
                  <TrashIcon className="icon" />
                </IconsList>
              </ItemList>
              <ItemList>
                <TextList> <CheckInput /> Guardar 10 reais</TextList>
                <IconsList>
                  <EditIcon className="icon" />
                  <TrashIcon className="icon" />
                </IconsList>
              </ItemList>
              <ItemList>
                <TextList> <CheckInput /> Guardar 10 reais</TextList>
                <IconsList>
                  <EditIcon className="icon" />
                  <TrashIcon className="icon" />
                </IconsList>
              </ItemList>
            </MidContainer>

            <BottomContainer>
                 <TaskProgress progress={47}>
                        <span>{47}%</span>
                      </TaskProgress>
                <AddBtn>Adicionar</AddBtn>
            </BottomContainer>
        </BodyList>
    )
}
