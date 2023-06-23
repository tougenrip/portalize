const RegisterForm = () => {
    return (
        <form action="/api/register" method="post" className="grid">
            <label>Roll Number</label>
            <input required className="text-slate-700"/>
            <label>Name:</label>
            <input type="text" id="name" name="name" required className="text-slate-700"/>
            <button type="submit">Submit</button>
        </form>
    )
}

export default RegisterForm