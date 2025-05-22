"use client";

import styles from "./Home.module.css";
import { Button, Card, Flex, Typography } from "antd";
import Image from "next/image";
//import Link from "next/link";

export default function Home() {
    return (
        <Card classname={styles.card}>
            <Flex justify="space-between">
            <div classname={styles.imageContainer}>
                <Image src="/image/fotoluiza.jpeg" alt="imagem minha" 
                fill
                sizes="max-width: 600px 100vw, 600px"
                className="{styles.image}" 
                priority
                    />
                    </div> 
            <div className="{styles.text}">

            
            </div>
            </Flex>
        </Card>
    );     
}