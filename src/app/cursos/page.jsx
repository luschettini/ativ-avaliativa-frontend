"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, Modal, Card, Skeleton } from "antd";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import styles from "./Curso.module.css";

const HEADERS = { "x-api-key": process.env.NEXT_PUBLIC_API_KEY };

export default function Cursos() {
    const [data, setData] = useState({
        cursos: [],
        loading: true,
        current: 1,
        pageSize: 5, 
    });

    const [modalInfo, setModalInfo] = useState({
        visible: false,
        curso: null,
        instrutor: null,
        loading: false,
    });

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const { data: cursos } = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/curso`,
                    { headers: HEADERS }
                );
                setData({ cursos, loading: false, current: 1, pageSize: 5 });
            } catch {
                toast.error("Erro ao carregar cursos!");
                setData((d) => ({ ...d, loading: false }));
            }
        };

        fetchCursos();
    }, []);

    const openModal = async (curso) => {
        setModalInfo({ visible: true, curso, instrutor: null, loading: true });

        try {
            const { data: instrutor } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/instrutor/${curso.instrutor_id}`,
                { headers: HEADERS }
            );
            setModalInfo((m) => ({ ...m, instrutor, loading: false }));
        } catch {
            toast.error("Erro ao carregar instrutor.");
            setModalInfo((m) => ({ ...m, loading: false }));
        }
    };

    const paginatedCursos = () => {
        const start = (data.current - 1) * data.pageSize;
        return data.cursos.slice(start, start + data.pageSize);
    };

    return (
        <div>
            <div className={styles.paginationContainer}>
            <h1 className={styles.h1}>Lista de Cursos</h1>
            <Pagination
                current={data.current}
                pageSize={data.pageSize}
                total={data.cursos.length}
                onChange={(page, size) =>
                    setData((d) => ({ ...d, current: page, pageSize: size }))
                }
                showSizeChanger
                pageSizeOptions={["5", "10", "100"]}
            />
            </div>

            {data.loading ? (
                <div className={styles.loadingContainer}>
                <Image
                    src="/icons/loading.gif"
                    width={300}
                    height={200}
                    alt="Loading"
                    unoptimized
                />
                </div>
            ) : (
                <div className={styles.cardsContainer}>
                    {paginatedCursos().map((curso) => (
                        <Card
                            key={curso.id}
                            className={styles.card}
                            hoverable
                            onClick={() => openModal(curso)}
                            cover={
                                <Image
                                    alt={curso.name}
                                    src={
                                        curso.photo && curso.photo.startsWith("http")
                                            ? curso.photo
                                            : "/images/220.svg"
                                    }
                                    width={220}
                                    height={220}
                                />
                            }
                        >
                            <Card.Meta
                                title={curso.name}
                                description={curso.descricao}
                            />
                        </Card>
                    ))}
                </div>
            )}

            <Modal
                title={`Detalhes do Curso: ${modalInfo.curso?.name}`}
                open={modalInfo.visible}
                onCancel={() =>
                    setModalInfo({
                        visible: false,
                        curso: null,
                        instrutor: null,
                        loading: false,
                    })
                }
                onOk={() =>
                    setModalInfo({
                        visible: false,
                        curso: null,
                        instrutor: null,
                        loading: false,
                    })
                }
                width={600}
            >
                {modalInfo.loading ? (
                    <Skeleton active />
                ) : modalInfo.instrutor ? (
                    <div className={styles.instrutorInfo}>
                        <p>
                            <span className={styles.label}>Instrutor:</span>{" "}
                            {modalInfo.instrutor.name}
                        </p>
                        <p>
                            <span className={styles.label}>Especialidade:</span>{" "}
                            {modalInfo.instrutor.experiencia}
                        </p>
                        <p>
                            <span className={styles.label}>Email:</span>{" "}
                            {modalInfo.instrutor.email}
                        </p>
                    </div>
                ) : (
                    <p style={{ textAlign: "center" }}>Informações do instrutor não encontradas.</p>
                )}
            </Modal>

            <ToastContainer position="top-right" autoClose={4500} />
        </div>
    );
}