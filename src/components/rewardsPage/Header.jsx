

const Header = () => {

    return (
        <header className="flex justify-between items-center m-5 mb-5 rounded-2xl border-4 border-transparent" style={{
            background: "linear-gradient(white, white) padding-box, var(--sky-gradient-shape) border-box"
          }}>
            <h1 className="text-3xl font-bold p-5">Rewards</h1>
            <p className="p-5">You have: 1234 points</p>
            {/* make it be on the same line lol */}
        </header>
    );
}

export default Header;