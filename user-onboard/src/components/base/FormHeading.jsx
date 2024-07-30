export default function FormHeading({ ...props }){
    return (
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">{props.children}</h2>
    )
}