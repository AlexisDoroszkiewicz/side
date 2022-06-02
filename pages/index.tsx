import type { NextPage } from 'next'
import data from "@public/tasks.json"
import Task from '@components/Task';
import { css } from '@emotion/react';

export async function getServerSideProps() {
  const tasks = Object.values({...data})

  return {
    props: {tasks}
  }
}

interface TaskProps {
  id: string,
  assignee?: object,
  company: object,
  details: object,
  selection: object,
  shifts?: object[],
  updatedAt?: string,
}

const Home: NextPage<{tasks:object[]}> = ({tasks}) => {
  console.log(tasks);
  
  return (
    <div css={container}>
      {tasks.map((task: TaskProps)  => {
        return (
          <Task key={task.id} task={task}/>
        )
      })}
    </div>
  )
}

export default Home

const container = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
