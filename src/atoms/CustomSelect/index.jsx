import theme from '../../theme';
import { CustomSelectContainer } from './style';
import Select from 'react-select';


const CustomSelect = ({
	onChange, defaultValue, options, 
	isSearchable, isClearable, name, 
	className, width, value
}) => {
	return (
		<CustomSelectContainer width={width}>
			<Select
				value={value}
				className={`basic-single ${className}`}
				classNamePrefix="select"
				defaultValue={defaultValue}
				onChange={onChange}
				isSearchable={isSearchable}
				isClearable={isClearable}
				name={name}
				options={options}
			/>
		</CustomSelectContainer>
	)
};

CustomSelect.defaultProps = {
	width: '100%',
	className: '',
	defaultValue: '',
	isSearchable: false,
	isClearable: false,
	name: '',
	options: [],
}

export default CustomSelect;