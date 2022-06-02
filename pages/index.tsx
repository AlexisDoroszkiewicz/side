import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import data from "@public/tasks.json"

// In a real scenario data will be dynamically generated and we will use getServerSideProps with calls to paginated API
export async function getStaticProps() {
  const tasks = {...data};

  return {
    props: {tasks}
  }
}

const Home: NextPage<{tasks:object}> = ({tasks}) => {
  console.log(tasks);
  
  return (
    <div>
      
    </div>
  )
}

export default Home
