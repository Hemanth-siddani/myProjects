import React from 'react'
// import '../styles/Home.css'
function Home() {
  return (
    <>
      <div className='infoContainer'>
        <h2 className='mainTitle'>Simple Interest</h2>
        <div className='dataContainer'>
          <p className='info'>
            What is Simple interest ?<br /><br />

            Simple interest is a straightforward method of calculating the interest charge on a loan or investment. It is determined by multiplying the principal amount (the initial sum of money), the interest rate, and the time period for which the money is borrowed or invested. The formula for simple interest is
            SI = 𝑃 × 𝑅 × 𝑇 , where
            SI
            SI represents the simple interest,
            𝑃
            P stands for the principal amount,
            𝑅
            R is the annual interest rate (expressed as a decimal), and
            𝑇
            T is the time period in years. Unlike compound interest, which calculates interest on both the initial principal and the accumulated interest, simple interest is only calculated on the original principal amount. This makes it easier to compute and understand, but it can result in lower returns for investments or lower costs for loans over time. Simple interest is commonly used in short-term loans, car loans, and some savings accounts, offering a clear and predictable way to determine the cost of borrowing or the return on investment.
          </p>
        </div>
      </div>
    </>
  )
}

export default Home
