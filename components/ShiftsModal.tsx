import { Key } from "react";
import { css } from "@emotion/react";
import dayjs from "dayjs";
import Shift from "@components/Shift";
import CloseBtn from "@components/CloseBtn";
import Target from "@components/Target";
import Applicants from "@components/Applicants";
import Status from "@components/Status";

export default function Shifts({
	opened,
	shifts,
	handleClick,
	task,
	expected,
	states,
	...props
}) {
	// split shifts into ended and upcoming so we can render different tabs
	// Should refacto -> use REACT PORTALS instead to move shifts in corresponding tab
	let upComingShifts = [];
	let endedShifts = [];

	shifts.forEach((shift, i) => {
		shift.state = states[i];
		if (dayjs() > dayjs(shift.end)) endedShifts.push(shift);
		else upComingShifts.push(shift);
	});

	// close modal if clicking on overlay background
	const closeModal = (e) => {
		if (e.target == e.currentTarget) handleClick();
	};

	return (
		<div css={container(opened)} onClick={(e) => closeModal(e)}>
			<div css={frame}>
				<div css={scrollContainer}>
					<div css={menuSticky}>
						<div css={menuWrap}>
							<div>
								<h3
									css={css`
										display: inline;
									`}>
									{task.company.name}
								</h3>
								<p>
									{task.details.jobType} :{" "}
									<Status>{task.selection.status}</Status>
								</p>
							</div>
							<div
								css={css`
									text-align: right;
									@media (max-width: 640px) {
										display: none;
									}
								`}>
								<Applicants
									amount={task.details.applicants}
									expected={expected}
								/>
								<Target>{task.selection.target}</Target>
							</div>
							<CloseBtn
								handler={handleClick}
								css={css`
									position: absolute;
									top: 0.5rem;
									right: 0.5rem;
								`}
							/>
						</div>
					</div>
					{upComingShifts.length != 0 && (
						<ShiftsGrid shifts={upComingShifts} />
					)}
					{upComingShifts.length != 0 && endedShifts.length != 0 && (
						<hr></hr>
					)}
					{endedShifts.length != 0 && (
						<div>
							<ShiftsGrid shifts={endedShifts} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

const ShiftsGrid = ({ shifts, ...props }) => {
	return (
		<div css={grid} {...props}>
			{shifts.map((shift: { id: Key }, i: number) => (
				<Shift key={shift.id} index={i} shift={shift} />
			))}
		</div>
	);
};

const container = (opened: boolean) => css`
	display: ${opened ? "grid" : "none"};
	place-items: center;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #00000080;
	z-index: 12;
`;
const frame = css`
	border-radius: 10px;
	overflow: hidden;
	border: 1px solid var(--black);
	position: relative;
	height: 70vh;
	@media (max-width: 640px) {
		height: -webkit-fill-available;
	}
`;

const scrollContainer = css`
	overflow-y: scroll;
	background: white;
	height: 100%;
`;
const menuSticky = css`
	position: sticky;
	top: 0;
	left: 0;
	background-color: var(--blueLight);
	z-index: 99;
	padding-left: 4rem;
	padding-right: 4rem;
	@media (max-width: 640px) {
		padding-left: 2rem;
		padding-right: 2rem;
	}
	padding-top: 0.75rem;
	padding-bottom: 0.75rem;
`;
const menuWrap = css`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const grid = css`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(min(100%, 10rem), 1fr));
	gap: 1rem;
	max-width: min(80vw, 1200px);
	padding: 2rem 4rem;
	@media (max-width: 640px) {
		max-width: none;
		padding: 2rem 2rem;
	}
`;
