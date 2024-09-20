export const columns = [
    {
        label: 'No.',
        field: 'index',
        type: 'index'
    },
    {
        label: 'Voucher Code',
        field: 'transactionCode',
        type: 'text'
    },
    {
        label: 'Customer',
        field: 'customer.name',
        type: 'text'
    },
    {
        label: 'Amount',
        field: 'amount',
        type: 'text'
    },
    {
        label: 'Status',
        field: 'status',
        type: 'status'
    },
    {
        label: 'Due Date',
        field: 'dueDate',
        type: 'date'
    },
    {
        label: 'Last Payment Date',
        field: 'lastPaymentDate',
        type: 'date'
    },
]