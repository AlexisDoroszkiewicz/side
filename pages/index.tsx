import type { NextPage } from 'next'
import Head from 'next/head';
import { css } from '@emotion/react';
import data from "@public/tasks.json"
import Task from '@components/Task';
import Filters from '@components/Filters';

// For real time updates will need to look into real time database and hooks
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
  
  return (
    <>
      <Head>
        <title>Tasks list</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Tasks list app"></meta>
      </Head>
      <main css={main}>
        <Filters/>
        <div css={container}>
          {tasks.map((task: TaskProps)  => {
            return (
              <Task key={task.id} task={task}/>
            )
          })}
        </div>
      </main>
    </>
    
  )
}

export default Home

const main = css`
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
`

const container = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
