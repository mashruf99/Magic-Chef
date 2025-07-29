import '../App.css';

export default function Form() {

    return (
        <form className="p-8 bg-neutral-50 shadow-xl">
            <div className="flex flex-col space-y-4">
                <label htmlFor="name" className="text-lg">Name:</label>
                <input type="text" id="name" className="p-2 border rounded" />

                <label htmlFor="email" className="text-lg">Email:</label>
                <input type="email" id="email" className="p-2 border rounded" />

                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit</button>
            </div>
        </form>
    );


}