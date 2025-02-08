import { Search } from "lucide-react";

function Navbar({ category, setCategory }) {
    return (
        <nav className="bg-white shadow-md p-4">
            <div className="container mx-auto flex items-center justify-between">
                <a href="/" className="text-2xl font-bold text-purple-600">Univibe</a>

                {/* Search Bar */}
                <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    />
                    <select
                        className="border rounded-md px-3 py-1 text-gray-700 bg-white"
                        value={category} // ใช้ค่า category จาก props
                        onChange={(e) => setCategory(e.target.value)} // ใช้ setCategory จาก props
                    >
                        <option value="">All</option>
                        <option value="University">University</option>
                        <option value="Faculty of Engineering">Faculty of Engineering</option>
                        <option value="Faculty of Agriculture">Faculty of Agriculture</option>
                    </select>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
