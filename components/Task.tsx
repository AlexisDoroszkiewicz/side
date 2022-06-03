import { useState, useLayoutEffect, useRef, useContext } from "react";
import { css } from "@emotion/react";
import dayjs from "dayjs";
import Applicants from "@components/Applicants";
import ShiftsModal from "@components/ShiftsModal";
import Status from "@components/Status";
import Target from "@components/Target";
import CloseBtn from "@components/CloseBtn";
import { Context } from "pages";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export default function Task({ task, ...props }) {
	const { company, details, selection, shifts } = task;

	// context used for filters
	const { selected, date, minWorker } = useContext(Context);
	const tag = task.selection.status;

	// ref to target task 🎯
	const taskRef: { current: HTMLDivElement } = useRef();

	// state to display shifts modal
	const [opened, setOpened] = useState(false);

	// array of states for each shift (lifted up state)
	const [stateArr, setStateArr] = useState([]);

	// task level state
	// has a shift that has start and slots left
	const [failing, setFailing] = useState(false);
	// has a shift starting in 24h or less and slots left
	const [short, setShort] = useState(false);
	// has no upcoming shifts, all ended
	const [noUpcomingShift, setNoUpcomingShift] = useState(true);
	// has x3 more applicants than expected workers
	const [closable, setClosable] = useState(false);
	// has a shift matching filtered day
	const [dayMatch, setDayMatch] = useState(false);

	// expected number of workers
	const [expected, setExpected] = useState(0);

	// added a ready state to only render after states have been set, since layouteffect didnt do what i want
	const [ready, setReady] = useState(false);

	// using Layoutfx so this occurs prior to first render, and displays tasks in proper order right away
	// else they move around after page loaded and it doesnt look good
	// for some reason this only works in dev env not on the deployed version 🤷‍♂️
	useLayoutEffect(() => {
		// for each shift, create an object of state properties and count expected workers
		if (task.shifts) {
			let arr = [];
			let counter = 0;
			let dayCheck = false;

			task.shifts.forEach(
				(shift: {
					end: string | number | Date | dayjs.Dayjs;
					start: string | number | Date | dayjs.Dayjs;
					filledSlots: number;
					slots: number;
				}) => {
					let state = { failing: false, short: false, ended: false };

					// can stop here if shift is ended
					if (dayjs() > dayjs(shift.end)) {
						state.ended = true;
						arr.push(state);
						return;
					}

					// if we get here, means task has at least 1 shift that hasnt ended, set noUpcomingShift to false
					// so it's only true if all shifts are ended
					if (noUpcomingShift == true) setNoUpcomingShift(false);

					// if shift started and filled < slots set failing
					if (
						dayjs() > dayjs(shift.start) &&
						shift.filledSlots < shift.slots
					) {
						if (failing == false) setFailing(true);
						state.failing = true;
					}

					// if shift starts in 24h or less and is lacking workers set short notice
					else if (
						dayjs(shift.start).diff(dayjs(), "hour") < 24 &&
						dayjs(shift.start).diff(dayjs(), "hour") > 0
					) {
						if (short == false) setShort(true);
						state.short = true;
					}
					// check if shift start day is between date.start and date.end
					if (
						!date.start ||
						!date.end ||
						dayjs(shift.start).isBetween(
							date.start,
							date.end,
							"day",
							"[]"
						)
					) {
						dayCheck = true;
					}

					arr.push(state);
					// add expected workers to counter
					counter += shift.slots - shift.filledSlots;
				}
			);

			// set States after all calculation is done to prevent unecessary rerenders
			setClosable(counter != 0 && task.details.applicants >= counter * 3);
			setExpected(counter);
			setStateArr(arr);
			setDayMatch(dayCheck);
			setReady(true);
		}
	}, [date]);

	const handleClick = () => {
		setOpened(!opened);
		if (document.body.style.overflow == "hidden")
			document.body.style.removeProperty("overflow");
		else document.body.style.overflow = "hidden";
	};

	const closeTask = () => {
		// HERE -> API CALL TO SET TASK STATUS TO "CLOSED" 📞;
		taskRef.current.style.display = "none";
	};

	// skip closed tasks ❌
	// has to be at the bottom since cant run hooks conditionally
	if (selected != "closed" && selection.status == "closed") return;
	// filter logic
	if (
		(selected && selected != tag) ||
		(date && dayMatch == false) ||
		expected < minWorker ||
		ready == false
	) {
		return;
	}

	return (
		<div
			ref={taskRef}
			css={taskContainer(
				failing,
				short,
				closable,
				expected,
				noUpcomingShift
			)}
			{...props}>
			<div>
				<div
					css={css`
						display: flex;
						justify-content: space-between;
						align-items: flex-start;
					`}>
					<div
						css={css`
							display: flex;
							align-items: center;
							gap: 1rem;
							margin-bottom: 2em;
						`}>
						{/* Should be using next Image component but had issues with AWS S3 domain config 🤷‍♂️ */}
						<img
							src={company.pictureURL}
							alt="company logo"
							width={"50"}
							height={"50"}
						/>
						<div>
							<h3>{company.name}</h3>
							<p>
								{details.jobType} :{" "}
								<Status>{selection.status}</Status>
							</p>
						</div>
					</div>
					{/* If expected == 0 (either no upcoming shift or all slots filled), then show close btn ❌*/}
					{expected == 0 && <CloseBtn handler={closeTask} />}
				</div>
			</div>

			<div
				css={css`
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
				`}>
				<div>
					<Applicants
						amount={details.applicants}
						expected={expected}
					/>
					<Target>{selection.target}</Target>
				</div>
				{/* disable button if no shifts */}
				<button css={button} onClick={handleClick} disabled={!shifts}>
					Shifts
				</button>
			</div>
			{shifts && (
				<ShiftsModal
					opened={opened}
					shifts={shifts}
					handleClick={handleClick}
					task={task}
					expected={expected}
					states={stateArr}
				/>
			)}
		</div>
	);
}

const taskContainer = (
	failing: boolean,
	short: boolean,
	closable: boolean,
	expected: number,
	noUpcomingShift: boolean
) => css`
	/* order tasks */
	order: ${failing
		? "-3"
		: short
		? "-2"
		: closable
		? "-1"
		: expected == 0 && "1"};
	border: 2px solid;
	border-color: ${failing
		? "var(--red)"
		: short
		? "var(--yellow)"
		: closable
		? "var(--green)"
		: "var(--greyLight)"};
	background-color: ${failing
		? "var(--redSubtle)"
		: short
		? "var(--yellowSubtle)"
		: closable
		? "var(--greenSubtle)"
		: noUpcomingShift && "var(--greySubtle)"};
	padding: 1rem;
	border-radius: 3px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	img {
		border: 1px solid var(--black);
		border-radius: 3px;
	}
`;

const button = css`
	padding: 0.5em 1em;
	background-color: var(--blue);
	border-radius: 4px;
	color: #ffffff;
	transition: all 300ms ease;
	overflow: hidden;
	align-items: center;
	cursor: pointer;
	border: none;
	height: fit-content;
	&:hover {
		background-color: var(--blueDark);
	}
	&[disabled] {
		background-color: var(--greyLight);
	}
`;
