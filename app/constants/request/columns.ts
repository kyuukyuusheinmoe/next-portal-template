export const columns = [
    {
        label: 'No.',
        field: 'index',
        type: 'index'
    },
    {
        label: 'Customer',
        field: 'userInfo.name',
        type: 'text'
    },
    {
        label: 'Amount',
        field: 'amount',
        type: 'text'
    },
    {
        label: 'Request Type',
        field: 'requestType',
        type: 'text'
    },
    {
        label: 'Status',
        field: 'status',
        type: 'status'
    },
    {
        label: 'Image',
        field: 'image',
        type: 'image'
    },
    {
        label: 'Created At',
        field: 'createdAt',
        type: 'date'
    },
]