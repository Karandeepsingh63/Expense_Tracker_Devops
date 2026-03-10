const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");

const {isValidObjectId}=require("mongoose");

// Dashboard Data
exports.getDashboardData = async (req, res) => {
  

  try {
    const userId = req.user.id; //  userId from token
    const userObjectId = new Types.ObjectId(userId);

    // Total Income
    // Aggregation to sum all income amounts of this user
    // Hindi Aggregation ka use karke user ki sari income ka sum nikal rahe hain
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } }, // filter by userId
      { $group: { _id: null, total: { $sum: "$amount" } } }, // sum of all "amount"
    ]);
    console.log("total income",{totalIncome,userId:isValidObjectId(userId)});

    // total kharcha
    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    //  Last 60 days Income Transactions
    const last60DaysIncomeTransactions = await Income.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }, // last 60 days
    }).sort({ date: -1 });
    console.log("Last 60 days income:", last60DaysIncomeTransactions);
//get total income for last 60 dat
    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );


//get expense transactio in last 30 days
    const last30DaysExepenseTransactions=await Expense.find({
      userId,
     date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenseLast30Days=last30DaysExepenseTransactions.reduce(
      (sum,transaction)=>sum+transaction.amount,0
    );



    const lastTransactions=[
      ...(await Income.find({userId}).sort({date:-1}).limit(5)).map(
        (txn)=>({
          ...txn.toObject(),
          type:"income",
        })
      ),
      ...(await Expense.find({userId}).sort({date:-1}).limit(5)).map(
        (txn)=>({
          ...txn.toObject(),
          type:"expense",
        })
      ),
    ].sort((a,b)=>b.date-a.date)

    //  Last 60 days Expense Transactions
    const last60DaysExpenseTransactions = await Expense.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }, // last 60 days
    }).sort({ date: -1 });
    console.log("Last 60 days expense:", last60DaysExpenseTransactions);

    // const expenseLast60Days = last60DaysExpenseTransactions.reduce(
    //   (sum, txn) => sum + txn.amount,
    //   0
    // );

  

    // pura akhir mei jo response aya
    res.json({
  totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
  totalIncome: totalIncome[0]?.total || 0,
  totalExpense: totalExpense[0]?.total || 0,
  Last30DaysExpenses: {
    total: expenseLast30Days,
    transactions: last30DaysExepenseTransactions,
  },
  last60DaysIncome: {
    total: incomeLast60Days,
    transactions: last60DaysIncomeTransactions,
  },
  recentTransactions: lastTransactions,
});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


  // //   Recent Transactions 5 from both Income & Expense
    // const recentIncome = await Income.find({ userId: userObjectId })
    //   .sort({ date: -1 })
    //   .limit(5);

    // const recentExpense = await Expense.find({ userId: userObjectId })
    //   .sort({ date: -1 })
    //   .limit(5);

  
    // //  Income aur Expense dono ko merge karke date ke hisaab se sort kar rahe hain
    // const lastTransactions = [
    //   ...recentIncome.map((txn) => ({
    //     ...txn.toObject(),
    //     type: "income",
    //   })),
    //   ...recentExpense.map((txn) => ({
    //     ...txn.toObject(),
    //     type: "expense",
    //   })),
    // ]
    //   .sort((a, b) => b.date - a.date) // latest first
    //   .slice(0, 5); // only 5