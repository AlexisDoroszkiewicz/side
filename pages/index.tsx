import type { NextPage } from "next";
import Head from "next/head";
import { css } from "@emotion/react";
import data from "@public/tasks.json";
import Task from "@components/Task";
import Filters from "@components/Filters";
import { createContext, useState } from "react";

// For real time updates will need to look into real time database and hooks
export async function getServerSideProps() {
	const tasks = Object.values({ ...data });

	return {
		props: { tasks },
	};
}

interface TaskProps {
	id: string;
	assignee?: object;
	company: object;
	details: object;
	selection: object;
	shifts?: object[];
	updatedAt?: string;
}

// should be setting types
export interface ContextProps {
	[key: string]: any;
}

export const Context = createContext<ContextProps>({});

const Home: NextPage<{ tasks: object[] }> = ({ tasks }) => {
	// global filters
	const [selected, setSelected] = useState();
	const [date, setDate] = useState();
	const [range, setRange] = useState();

	return (
		<>
			<Head>
				<title>Tasks list</title>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
				<meta name="description" content="Tasks list app"></meta>
			</Head>
			<main css={main}>
				<Context.Provider
					value={{
						selected,
						setSelected,
						date,
						setDate,
						range,
						setRange,
					}}>
					<Filters />
					<div css={container}>
						{tasks.map((task: TaskProps) => {
							return <Task key={task.id} task={task} />;
						})}
					</div>
				</Context.Provider>
			</main>
		</>
	);
};

export default Home;

const main = css`
	max-width: 800px;
	margin-left: auto;
	margin-right: auto;
	padding-left: 1rem;
	padding-right: 1rem;
`;

const container = css`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;
