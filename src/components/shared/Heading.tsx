import React from 'react'
import { View, I18nManager } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import { colors, styles } from '../../utils';
import { Text, IconButton } from 'react-native-paper';

export default function Heading({ title, subtitle, button }: any) {
	return (
		<View style={{ paddingHorizontal: 25 }}>
			<Grid style={{ alignItems: 'center' }}>
				<Col size={80} style={{ alignItems: 'flex-start' }}>
					<Text style={styles.headingTitle}>{title}</Text>
					{subtitle ? (<Text style={styles.headingSubTitle}>{subtitle}</Text>) : null}
				</Col>
				{button ?
					<Col size={20} style={{ alignItems: 'flex-end' }}>
						<IconButton icon="chevron-right" iconColor={colors.PRIMARY} size={25} onPress={button} />
					</Col>
					: null}
			</Grid>
		</View>
	)
}