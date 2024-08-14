

const RewardHeader = ({rewardName}) => {

    return (
        <header className="flex justify-between items-center m-5 mb-5 rounded-2xl border-4 border-transparent shadow-lg" style={{
            background: "linear-gradient(white, white) padding-box, var(--sky-gradient-shape) border-box"
          }}>
            <h1 className="text-3xl font-bold p-5">{rewardName} Reward</h1>
            <p className="p-5">You have: 1234 points</p>
        </header>
    );
}

export default RewardHeader;