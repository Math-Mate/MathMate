import React, { useEffect } from "react";
import { useState } from "react";
import "./styles/dnd-operation.css"
import { nanoid } from "@reduxjs/toolkit"
import appleIcon from '../assets/apple.png'
import apple2Icon from '../assets/apple2.png'
import basketIcon from '../assets/basket.png'
import additionIcon from '../assets/addition.png'
import bananaIcon from '../assets/banana.png'
import orangeIcon from '../assets/orange.png'
import grapeIcon from '../assets/grape.png'
import pencilIcon from '../assets/pencil.png'

const BoxFullOfItems = (props) => {

    return (
        <>
            <div className="box-full-of-items">
                {
                    Array.from({ length: props.num }, (_, i) => i + 1).map(() => {
                        return (
                            <div key={nanoid()}>
                                <img src={props.iconSrc} draggable={false} width={props.itemWidth} onContextMenu={(e)=> {e.preventDefault()}}></img>
                            </div>
                        )
                    })
                }
            </div>

        </>

    )
}

const BasketSource = (props) => {

    const handleOnDrag = (e, widgetType) => {
        console.log("onDrag triggered")
        e.dataTransfer.setData("widgetType", widgetType)
    }


    return (
        <>

            <div className="basket-source">
                {
                    Array.from({ length: props.num }, (_, i) => i + 1).map(() => {
                        return (
                            <div key={nanoid()} draggable onDragStart={(e) => { handleOnDrag(e, "apple")  } }  onTouchStart={(e)=>{handleOnDrag(e,"apple")}} onContextMenu={(e)=>{e.preventDefault()}} onClick={(e)=>{e.preventDefault()}} onTouchEnd={(e)=>{e.preventDefault()}}>
                                <img src={props.iconSrc} width={props.itemWidth} ></img>
                            </div>
                        )
                    })

                }

            </div>

        </>
    )

}

const BasketTarget = (props) => {
    const handleDragOver = (e) => {
        console.log("onDragOver triggered")
        e.preventDefault()
    }
    const handleOnDrop = (e) => {
        const widgetType = e.dataTransfer.getData("widgetType")
        console.log("widgetType : ", widgetType)
        if (widgetType === "apple") {
            props.incrementHook()
        }

    }

    return (
        <>
            <div className="basket-target" onDrop={handleOnDrop} onDragOver={handleDragOver} onTouchEnd={handleOnDrop} onTouchMove={handleDragOver} style={{ backgroundImage: `url(${basketIcon})` }}>
                <span> Count: {props.num} </span>
            </div>
        </>

    )
}

const DndOperation = (props) => {

    const [itemNo1, setItemNo1] = useState(Math.floor(Math.random() * 5) + 1);
    const [itemNo2, setItemNo2] = useState(Math.floor(Math.random() * 5) + 1);
    const [itemsInTargetBasket, setItemsInTargetBasket] = useState(0);
    const [itemsInSourceBasket, setItemsInSourceBasket] = useState(13);
    const [operationIcon, setOperationIcon] = useState(null)
    const [itemIcon, setItemIcon] = useState(null)
    const iconList = [appleIcon, apple2Icon, bananaIcon, orangeIcon, grapeIcon, pencilIcon]

    const randomFromArray = (arr) => {
        return arr[Math.floor(Math.random() * arr.length)]
    }



    useEffect(() => {

        switch (props.type) {
            case "+":
                setOperationIcon(additionIcon)
                break

            default:
                console.err("Invalid Operation", props.type)
                break;
        }

        setItemIcon(randomFromArray(iconList))


    }, [])

    const resetValues = () => {
        setItemNo1(Math.floor(Math.random() * 5) + 1)
        setItemNo2(Math.floor(Math.random() * 5) + 1)
        setItemsInSourceBasket(13)
        setItemsInTargetBasket(0)
        setItemIcon(randomFromArray(iconList))
    }

    const incrementItemsInTargetBasket = () => {
        let c = itemsInTargetBasket
        let d = itemsInSourceBasket
        setItemsInTargetBasket(c + 1)
        setItemsInSourceBasket(d - 1)
    }

    const checkCorrectAnswer = () => {
        let a = itemNo1
        let b = itemNo2
        let c = itemsInTargetBasket

        if (a + b === c) {
            alert("Hurray !! Correct Answer");
        } else {
            alert("Better Luck Next Time !! Incorrect Answer")
        }
        resetValues()

    }





    return (
        <>
            <div className="dnd-operation-container prevent-select" >
                <div className="dnd-operation-container-left">

                    <div className="dnd-operation-container-left-top">
                        <div className="button-container">
                            <button onClick={(e) => { checkCorrectAnswer() }}> Submit </button>
                            <button onClick={(e) => { resetValues() }}> Reset </button>
                        </div>
                    </div>
                    <div className="dnd-operation-container-left-bottom">
                        <BoxFullOfItems num={itemNo1} itemWidth="100px" iconSrc={itemIcon} />
                        <img src={operationIcon} className="icon-operation" ></img>
                        <BoxFullOfItems num={itemNo2} itemWidth="100px" iconSrc={itemIcon} />
                    </div>
                </div>

                <div className="dnd-operation-container-right">
                    <BasketTarget num={itemsInTargetBasket} incrementHook={incrementItemsInTargetBasket} />
                    <BasketSource num={itemsInSourceBasket} itemWidth="80px" iconSrc={itemIcon} />
                </div>
            </div>

        </>

    )

}

export default DndOperation;
