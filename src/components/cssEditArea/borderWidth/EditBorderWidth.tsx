import React, { useState } from 'react'
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
    Tooltip,
    Flex,
    Text,
    Button,
    Box,
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { setBorderWidth } from '../../buttonView/buttonViewSlice'
import { AddIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'
import { addCssButtonAnimeVariants } from '../animation/addCssButton'
import { rotateElementVariants } from '../animation/rotateElement'
import { EditBorderWidthTop } from './borderWidthTop/EditBorderWidthTop'
import { EditBorderWidthRight } from './borderWidthRight/EditBorderWidthRight'
import { EditBorderWidthBottom } from './borderWidthBottom/EditBorderWidthBottom'
import { EditBorderWidthLeft } from './borderWidthLeft/EditBorderWidthLeft'

export const EditBorderWidth = () => {
    const dispatch = useAppDispatch()
    const borderWidth = useAppSelector((state) => state.buttonView.borderWidth)
    const displayBorderWidth = useAppSelector((state) => state.cssCustomArea.displayBorderWidth)
    const [showTooltip, setShowTooltip] = useState(false)
    const [isDisplayDetail, setIsDisplayDetail] = useState(false)
    const [allBorderWidth, setAllBorderWidth] = useState('')

    const onChangeValue = (v: number) => {
        setAllBorderWidth(v.toString() + 'px')
        dispatch(setBorderWidth(v.toString() + 'px'))
    }
    return (
        <>
            {displayBorderWidth && (
                <Flex
                    flexDirection={'column'}
                    alignItems={'center'}
                    margin={'1rem'}
                    padding={'1rem'}
                    width={'50rem'}
                    border={'1px'}
                    borderRadius={'1rem'}
                    borderColor={'gray.200'}
                >
                    <Text color={'black'} marginBottom={'1rem'} fontSize={'2rem'}>
                        borderWidth
                    </Text>
                    <Slider
                        id="slider"
                        defaultValue={0}
                        value={parseInt(allBorderWidth.replace('px', ''))}
                        min={0}
                        max={100}
                        colorScheme="teal"
                        onChange={(v) => onChangeValue(v)}
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        <SliderMark color={'black'} value={25} mt="1" ml="-2.5" fontSize="sm">
                            25px
                        </SliderMark>
                        <SliderMark color={'black'} value={50} mt="1" ml="-2.5" fontSize="sm">
                            50px
                        </SliderMark>
                        <SliderMark color={'black'} value={75} mt="1" ml="-2.5" fontSize="sm">
                            75px
                        </SliderMark>
                        <SliderTrack bg={'teal.50'}>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <Tooltip
                            hasArrow
                            bg="teal.500"
                            color="white"
                            placement="top"
                            isOpen={showTooltip}
                            label={`${borderWidth}`}
                        >
                            <SliderThumb />
                        </Tooltip>
                    </Slider>
                    <Button
                        as={motion.button}
                        margin={['0rem', '2rem']}
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
                    {isDisplayDetail && (
                        <>
                            <EditBorderWidthTop />
                            <EditBorderWidthRight />
                            <EditBorderWidthBottom />
                            <EditBorderWidthLeft />
                        </>
                    )}
                </Flex>
            )}
        </>
    )
}