import styles from './CountryAdmin.module.css'

export const CountryAdmin = () => {
    return(
        <div className={styles.containerPrincipal}>
            <div className={styles.containerTitleAndButton}>
                <div className={styles.containerTitle}>
                    <h1>Gestión de Colores</h1>
                </div>
                <div className={styles.containerButtons}>
                    <button >
                        Añadir
                    </button>
                </div>
            </div>
            <div className={styles.countryTable}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Color</th>
                        <th>Valor</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {colors?.map((color) => (
                    <tr key={color.id}>
                        <td>{color.id}</td>
                        <td>
                            <div style={{'backgroundColor' : `${color.value}`, 'width' : '100%', 'height' : '30px', 'borderRadius' : '5px'}}></div>
                        </td>
                        <td>{color.value.toUpperCase()}</td>
                        
                        
                        <td>
                            <div className={styles.actionButtons}>
                                <button onClick={() => handleEdit(color)}>Editar</button>
                                <button onClick={() => handleDelete(String(color.id))}>Eliminar</button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {modalAdminColor.type && <div className={styles.modalBackdrop}> <AdminColor/></div>}
        </div>
    )
}