import styles from "./page.module.css"

export default function Cliente() {
    return (
        <main>
            <div>
                <p className={styles.title}>Cadastro de Cliente</p>
            </div>
            <form action="/grupo" method="post">
                <div className={styles.container_form}>
                    <div>
                        <p>Nome cliente</p>
                        <input type="text" name="nome" id="nome" placeholder="Digite o nome"/>
                    </div>
                    <div>
                        <p>Endereço cliente</p>
                        <input type="text" name="endereco" id="endereco" placeholder="Digite o endereco"/>
                    </div>
                    <div className="button">
                        <input type="submit" value="Cadastrar"/>
                    </div>
                </div>
            </form>
        </main>
    )
}