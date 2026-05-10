"use client";

import { IconType } from "react-icons";

import { motion } from "framer-motion";

interface StatCardProps {

  title: string;

  value: string;

  icon: IconType;

  color: string;

}

export default function StatCard({

  title,

  value,

  icon: Icon,

  color,

}: StatCardProps) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 30,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.5,
      }}

      whileHover={{
        scale: 1.03,
      }}

      className={`${color} text-white p-6 rounded-2xl shadow-lg cursor-pointer`}
    >

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-lg font-medium">

            {title}

          </h2>

          <p className="text-3xl font-bold mt-2">

            {value}

          </p>

        </div>



        <Icon size={40} />

      </div>

    </motion.div>

  );

}