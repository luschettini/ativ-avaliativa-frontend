"use client";
import styles from "./Home.module.css";
import { Button, Card } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <div className={styles.bodyContainer}>
        <Card className={styles.card}>
            <h1 className={styles.title}>Luiza Nicoluci Schettini</h1>
                <div className={styles.content}>
                    <div className={styles.imageContainer}>
                    <Image
                    src="/image/fotoluiza.jpeg"
                    alt="imagem minha"
                    width={300}
                    height={400}
                    className={styles.image}
                    priority
/>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.description}>
                            <h2 className={styles.paragraph}>    </h2>
                            <ul className={styles.list}>
                                <li><strong>Turma:</strong>2TDS1</li>
                                <li><strong>Instrutores:</strong>Marcelo e Thiago</li>
                                <li><strong>Matéria:</strong>Prova Prática-NEXT.JS FRONTEND 1</li>
                                <li>Minha API foi desenvolvida para gerenciar informações de cursos e instrutores. 
                                A entidade <strong>Curso</strong> representa os cursos disponíveis, enquanto a entidade <strong>Instrutor</strong> armazena os dados dos professores responsáveis por cada curso. 
                                A relação entre elas permite associar instrutores a diferentes cursos, facilitando a organização e consulta dessas informações.
                                </li>
                        </ul>
                    </div>
                    <Link href="/cursos" prefetch>
                        <Button type="primary">Acessar minha API GET via Axios</Button>
                    </Link>
                </div>
                </div>
            </Card>
        </div>
    );
}
