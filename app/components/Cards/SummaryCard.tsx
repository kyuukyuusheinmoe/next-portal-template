import { KeyValueObject } from "@/app/types/common";

type SummaryCardProps = {
    title: string;
    data: KeyValueObject[]
}

const SummaryCard = ({title, data }: SummaryCardProps) => {
    return (
      <div className="card w-full max-w-md bg-base-100 shadow-xl mx-auto">
        <div className="card-body p-4">
          <h2 className="card-title text-xl font-bold">{title}</h2>

            {
                data?.map (d=> <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-gray-600">{d.label}</span>
                    <span className="text-gray-800">{d.value}</span>
                  </div>)
            }
        </div>    
      </div>
    );
  };
  
  export default SummaryCard;
  