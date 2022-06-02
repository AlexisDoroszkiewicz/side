import type { NextPage } from 'next'
import data from "@public/tasks.json"
import Task from '@components/Task';
import { css } from '@emotion/react';

// In a real scenario data will be dynamically generated and we will use getServerSideProps with calls to paginated API
export async function getStaticProps() {
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(400px, 100%), 1fr));
  gap: 1rem;
  margin: 1rem;
`
