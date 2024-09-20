import { ItemDetailsProps } from '@/app/types/common'

const DEFAULT_IMG = '/intro.png'

const ItemDetails: React.FC<{item: ItemDetailsProps}> = ({ item }) => {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
        <img className="w-full h-24 object-cover" src={DEFAULT_IMG} alt={item.name} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-gray-800">{item.name}</div>
          <p className="text-gray-700 text-base">
            Weight: {item.weight} {item.unit}
          </p>
        </div>
      </div>
    );
  };

export default ItemDetails
