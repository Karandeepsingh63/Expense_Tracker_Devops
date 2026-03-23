import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseTransaction = ({ transactions, onSeeMore }) => {
  // console.log(transactions)
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className='text-lg'>Expenses</h5>
        <button className='card-btn' onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0,5).map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
             date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            hideDeleteBtn={true}
          />
        ))}
      </div>
    </div>
  )
}

export default ExpenseTransaction
// import React from 'react'
// import { LuArrowRight } from 'react-icons/lu'
// import TransactionInfoCard from '../Cards/TransactionInfoCard'
// import moment from 'moment'

// const ExpenseTransaction = ({ transactions, onSeeMore }) => {
//   // 1) Always coerce to an array
//   const list = Array.isArray(transactions) ? transactions : []

//   // 2) Sort newest first (in case it's unsorted), then take top 5
//   const topFive = [...list]
//     .sort((a, b) => new Date(b.createdAt || b.date || 0) - new Date(a.createdAt || a.date || 0))
//     .slice(0, 5)
// console.log('ExpenseTransaction typeof transactions:', typeof transactions, 'isArray?', Array.isArray(transactions))
// console.log('Sample item:', Array.isArray(transactions) ? transactions[0] : transactions)

//   return (
//     <div className="card">
//       <div className="flex items-center justify-between">
//         <h5 className="text-lg">Expenses</h5>
//         <button className="card-btn" onClick={onSeeMore}>
//           See All <LuArrowRight className="text-base" />
//         </button>
//       </div>

//       {/* Small sanity check badge so you can SEE counts while testing */}
//       <div className="mt-2 text-xs text-gray-500">
//         Showing {topFive.length} of {list.length}
//       </div>

//       <div className="mt-6">
//         {topFive.length > 0 ? (
//           topFive.map((expense) => {
//             const dt = expense.createdAt || expense.date || expense.updatedAt
//             return (
//               <TransactionInfoCard
//                 key={expense._id}
//                 title={expense.category}
//                 icon={expense.icon}
//                 date={dt ? moment(dt).format('Do MMM YYYY') : '—'}
//                 amount={expense.amount}
//                 type="expense"
//                 hideDeleteBtn={true}
//               />
//             )
//           })
//         ) : (
//           <p className="text-sm text-gray-500">No recent expenses</p>
//         )}
//       </div>
//     </div>
//   )
// }

// export default ExpenseTransaction

