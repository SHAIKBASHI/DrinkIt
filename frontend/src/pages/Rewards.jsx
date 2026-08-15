import React from "react";
import {
  FaCoins,
  FaGift,
  FaHeartbeat,
  FaCrown,
  FaMedal,
  FaCheckCircle
} from "react-icons/fa";
import "../styles/rewards.css";

function Rewards() {

  const rewards = [
    {
      id: 1,
      title: "₹100 Discount Coupon",
      coins: 100,
      icon: <FaGift />
    },
    {
      id: 2,
      title: "Recovery Kit",
      coins: 250,
      icon: <FaHeartbeat />
    },
    {
      id: 3,
      title: "Premium Membership",
      coins: 500,
      icon: <FaCrown />
    },
    {
      id: 4,
      title: "Health Checkup Voucher",
      coins: 1000,
      icon: <FaMedal />
    }
  ];

  const history = [
    {
      id: 1,
      text: "Purchased Kingfisher Beer",
      coins: "+20",
      date: "Today"
    },
    {
      id: 2,
      text: "Recovery Kit Bonus",
      coins: "+25",
      date: "Yesterday"
    },
    {
      id: 3,
      text: "Coupon Redeemed",
      coins: "-100",
      date: "2 Days Ago"
    }
  ];

  return (

    <div className="container-custom">

      <div className="rewards-page">

        <div className="wallet-card">

          <FaCoins className="wallet-icon" />

          <h2>520 Liver Coins</h2>

          <p>
            Earn coins on every order and redeem exciting rewards.
          </p>

        </div>

        <div className="progress-card">

          <h3>Reward Progress</h3>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{ width: "52%" }}
            ></div>

          </div>

          <p>520 / 1000 Coins</p>

        </div>

        <h3 className="section-title">
          Redeem Rewards
        </h3>

        <div className="reward-list">

          {rewards.map((reward) => (

            <div
              className="reward-card"
              key={reward.id}
            >

              <div className="reward-icon">

                {reward.icon}

              </div>

              <div className="reward-info">

                <h4>{reward.title}</h4>

                <p>{reward.coins} Coins</p>

              </div>

              <button>

                Redeem

              </button>

            </div>

          ))}

        </div>

        <div className="achievement-card">

          <FaCheckCircle className="achievement-icon" />

          <div>

            <h3>Healthy Choice</h3>

            <p>
              Bought 5 Recovery Kits this month.
            </p>

          </div>

        </div>

        <h3 className="section-title">

          Coin History

        </h3>

        <div className="history-list">

          {history.map((item) => (

            <div
              className="history-card"
              key={item.id}
            >

              <div>

                <h4>{item.text}</h4>

                <small>{item.date}</small>

              </div>

              <span
                className={
                  item.coins.startsWith("+")
                    ? "plus"
                    : "minus"
                }
              >
                {item.coins}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default Rewards;