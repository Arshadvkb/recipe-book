const Navbar = () => {
    return (
        <div>
            <nav className="flex fixed  justify-between pt-2  text-amber-50 h-10 bg-primary min-w-screen">
                <h1>Recipe Book</h1>
                <div>
                    <ul className="flex justify-around gap-2 pr-6">
                        <li>
                            <a href="/home">Home</a>
                        </li>
                        <li>
                            <a href="/add">Add_recipe</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
