export default function Button({ stlyeClasses, handleClick, ...props }) {
    const styles = stlyeClasses + " flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    return (
        <button className={styles}
        onClick={handleClick}
            {...props}>
            {props.children}
        </button>
    )
}