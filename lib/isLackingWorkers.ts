export default function isLackingWorkers(
	filledSlots: number,
	totalSlots: number
) {
	if (filledSlots < totalSlots) return true;
	else return false;
}
