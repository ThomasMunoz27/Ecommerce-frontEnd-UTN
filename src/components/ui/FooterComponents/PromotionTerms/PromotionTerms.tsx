import style from './PromotionTerms.module.css';

export const PromotionTerms = () => {
    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitle}>
                <h1>Términos y Condiciones de Promociones</h1>
            </div>
            <div className={style.containerContent}>
                <p>Última actualización: 10/06/2025</p>
                <p>
                    Estas condiciones aplican a todas las promociones, descuentos y ofertas 
                    especiales ofrecidas por <strong>Campeones.com</strong>. Al participar, aceptas 
                    cumplir con los términos establecidos.
                </p>

                <ol>
                    <li><strong>Elegibilidad</strong></li>
                </ol>
                <p>
                    Las promociones están disponibles solo para usuarios mayores de 18 años que 
                    residan en paises de Latinoamercia. Pueden aplicar restricciones adicionales 
                    para ciertas promociones.
                </p>

                <ol start={2}>
                    <li><strong>Duración</strong></li>
                </ol>
                <p>
                    Cada promoción tiene un período de validez específico. Las compras realizadas 
                    fuera de este período no califican para los beneficios promocionales.
                </p>

                <ol start={3}>
                    <li><strong>Códigos Promocionales</strong></li>
                </ol>
                <p>
                    Los códigos promocionales deben ser ingresados al momento de realizar la compra. 
                    Solo se permite un código promocional por pedido. Los códigos son intransferibles 
                    y no tienen valor en efectivo.
                </p>

                <ol start={4}>
                    <li><strong>Limitaciones</strong></li>
                </ol>
                <p>
                    Las promociones no pueden combinarse con otros descuentos o ofertas, a menos que 
                    se indique lo contrario. Los productos en liquidación pueden estar excluidos de 
                    las promociones.
                </p>

                <ol start={5}>
                    <li><strong>Devoluciones y Reembolsos</strong></li>
                </ol>
                <p>
                    En caso de devoluciones, los descuentos aplicados serán ajustados proporcionalmente 
                    y reembolsados según el monto pagado originalmente.
                </p>

                <ol start={6}>
                    <li><strong>Modificaciones</strong></li>
                </ol>
                <p>
                    Nos reservamos el derecho de modificar o cancelar cualquier promoción en cualquier 
                    momento, sin previo aviso.
                </p>

                <ol start={7}>
                    <li><strong>Contacto</strong></li>
                </ol>
                <p>
                    Si tienes preguntas sobre nuestras promociones, contáctanos en:
                </p>
                <ul>
                    <li>
                        <strong>Correo electrónico:</strong> <a href="mailto:promos@campeones.com">promos@campeones.com</a>
                    </li>
                    <li><strong>Teléfono:</strong> +5491123456789</li>
                </ul>

                <p>
                    Gracias por participar en las promociones de <strong>Campeones.com</strong>. Nos 
                    esforzamos por ofrecerte las mejores ofertas.
                </p>
            </div>
        </div>
    );
};
