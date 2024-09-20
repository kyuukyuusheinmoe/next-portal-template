import { getColorForStatus } from "@/app/utils/common";

const StatusBadge = ({value}:{value: string}) => {
    const colorCode = getColorForStatus(value);
    return <span className="badge" style={{backgroundColor: colorCode}}>{value}</span>;
}

export default StatusBadge;