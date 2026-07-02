import CountUp from "react-countup";

//const CountUp = CountUpLib.default;
import { motion } from "framer-motion";

export default function StatsCard({
    number,
    suffix,
    label,
    decimals = 0
}) {

    return (

        <motion.div
            whileHover={{ y: -5 }}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-8 text-center"
        >

            <h2 className="text-4xl font-bold text-blue-400">

                <CountUp.default
    end={number}
    duration={2}
    decimals={decimals}
/>

                {suffix}

            </h2>

            <p className="mt-3 text-slate-400">

                {label}

            </p>

        </motion.div>

    );
}