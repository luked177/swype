"use client";

import { addToReadingList } from "@/actions/addToReadingList";
import { Article } from "@/types/article";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

export const Deck = ({
	items,
}: {
	items: {
		id: number;
		content: React.ReactNode;
		data: Article;
	}[];
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	if (items.length === 0) return null;
	const currItem = items[currentIndex];
	return (
		<div className="relative w-full h-full max-w-md mx-auto overflow-hidden">
			<AnimatePresence initial={false}>
				<motion.div
					key={currentIndex}
					drag="x"
					dragConstraints={{ left: 0, right: 0 }}
					onDragEnd={(e, info) => {
						if (info.offset.x > -100) {
							addToReadingList(currItem.data);
						}
						setCurrentIndex((prevIndex) => (prevIndex < items.length - 1 ? prevIndex + 1 : 0));
					}}
					className="absolute w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
				>
					{currItem.content}
				</motion.div>
			</AnimatePresence>
		</div>
	);
};
