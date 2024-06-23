function Home({ products }) {

    let ItemRows = "";
    if (products && products.length > 0) {
        ItemRows = products.map((product) => (
            <tr key={product.id}>
                <td className="table-name">{product.name}</td>
            </tr>
        ));
    }
    
    return (
        <div className="max-w-7xl mx-auto p-5">
            <div className="text-3xl font-bold my-4 text-center">
                Product Management
            </div>
            <div>Total Products: {products.length}</div>
            <div className="table-responsive-md mt-4">
                <table className="table table-hover details">
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>{ItemRows}</tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
