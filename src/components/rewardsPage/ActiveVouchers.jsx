import { Link } from "react-router-dom";


const ActiveVouchers = () => {

    // check if data exists
    // populate table

    return (
        <div>
            Active Vouchers
            <table>
                <tr>
                    <th>1 free coffee</th>
                    <th>Expires in: 3 days</th>
                    <th><Link to={"/rewards"}>
                        shortcut
                    </Link></th>
                </tr>
            </table>
        </div>
    );
}

export default ActiveVouchers;