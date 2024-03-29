import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { AlphaPicker, ChromePicker, ColorResult, HuePicker } from 'react-color'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { getElementUid, saveCurrentCssProps } from '../../pseudoArea/pseudoAreaSlice'
import { addCssButtonAnimeVariants } from '../animation/addCssButton'
import { rotateElementVariants } from '../animation/rotateElement'

export const EditBorderColor = () => {
    const selectedElementClass = useAppSelector((state) => state.pseudoArea.elementClassSelectedCurrent) //現在の選択中のelementClass
    const selectedElementName = useAppSelector((state) => state.pseudoArea.elementNameSelectedCurrent) //現在の選択中のelementName
    const dispatch = useAppDispatch()
    const uid = getElementUid(selectedElementName, selectedElementClass)
    const cssStates = useAppSelector((state) => state.pseudoArea.cssStates) //現在のcssState
    let borderColor = cssStates[uid].cssProps.borderColor
    if (!borderColor) {
        borderColor = ''
    }
    const displayBorderColor = cssStates[uid].customAreaDisplay.borderColor
    const [isDisplayDetail, setIsDisplayDetail] = useState(false)
    const handleChange = (color: ColorResult) => {
        const rgba = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
        dispatch(
            saveCurrentCssProps({
                elementName: selectedElementName,
                classNames: selectedElementClass,
                cssPropKey: 'borderColor',
                cssPropValue: rgba,
            })
        )
    }
    return (
        <Flex>
            {displayBorderColor ? (
                <Flex
                    flexDirection={'row'}
                    alignItems={'center'}
                    width={'50rem'}
                    backgroundColor={'gray.50'}
                    borderRadius={'1rem'}
                    marginTop={'1rem'}
                    paddingTop={'0.5rem'}
                    paddingBottom={'0.8rem'}
                >
                    <Text
                        color={'blackAlpha.800'}
                        width={'100%'}
                        marginLeft={'1rem'}
                        marginRight={'1rem'}
                        fontSize={'1.2rem'}
                    >
                        Border Color
                    </Text>
                    <Box>
                        <HuePicker
                            width={isDisplayDetail ? '20rem' : '30rem'}
                            color={borderColor}
                            onChange={handleChange}
                        />
                        <AlphaPicker
                            width={isDisplayDetail ? '20rem' : '30rem'}
                            color={borderColor}
                            onChange={handleChange}
                        />
                    </Box>
                    <Button
                        as={motion.button}
                        marginLeft={'2rem'}
                        marginRight={'1rem'}
                        width={'2rem'}
                        height={'2rem'}
                        variants={addCssButtonAnimeVariants}
                        initial={addCssButtonAnimeVariants.off}
                        whileHover={addCssButtonAnimeVariants.on}
                        animate={isDisplayDetail ? addCssButtonAnimeVariants.on : addCssButtonAnimeVariants.off}
                        onClick={() => setIsDisplayDetail(!isDisplayDetail)}
                    >
                        <Box
                            display={'flex'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            as={motion.div}
                            initial={rotateElementVariants.off}
                            animate={isDisplayDetail ? rotateElementVariants.on : rotateElementVariants.off}
                            whileHover={rotateElementVariants.on}
                        >
                            <AddIcon />
                        </Box>
                    </Button>
                    {isDisplayDetail ? (
                        <Box marginLeft={'1rem'} marginRight={'0.5rem'}>
                            <ChromePicker color={borderColor} onChange={handleChange} />
                        </Box>
                    ) : (
                        ''
                    )}
                </Flex>
            ) : (
                ''
            )}
        </Flex>
    )
}
