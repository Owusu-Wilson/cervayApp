  {/* row for the text and dropdown */}
  <View style={styles.row}>
  <Text style={styles.head}>Traverse</Text>
  {/* <AntDesign style={styles.topIcon} name="infocirlce" size={30} /> */}
  <Dropdown
    style={styles.dropdown}
    placeholderStyle={styles.placeholderStyle}
    selectedTextStyle={styles.selectedTextStyle}
    inputSearchStyle={styles.inputSearchStyle}
    iconStyle={styles.iconStyle}
    data={traverseData}
    search
    maxHeight={300}
    labelField="traverseStation"
    valueField="id"
    placeholder="Select Traverse"
    searchPlaceholder="Search..."
    value={value}
    onChange={dropdownItem}
    renderLeftIcon={() => (
      <AntDesign style={styles.icon} color="black" name="" size={25} />
    )}
  />
</View>

<Text style={styles.label}>Instrument Station</Text>
<InputBar
  style={styles.stationField}
  placeholder="Instrument station"
  value={station}
  onChangeText={(text) => setStation(text)}
  width={350}
/>
{/* Row 1  - Backsite a*/}
<View style={styles.row}>
  <InputBar
    style={styles.stationField}
    placeholder="Backsight"
    value={description_1}
    multiline={true}
    onChangeText={(text) => setDescription_1(text)}
  />
  <Text style={styles.desc}>LL </Text>
  <InputBar
    style={styles.stationField}
    placeholder="000.00.00"
    dataType="number"
    maxLength={11}
    value={bearingLL1}
    onEndEditing={(text) => {
      formatBearing(text);
    }}
    onChangeText={(text) => {
      if (/^\d+$/.test(text) || text === "") {
        setBearingLL1(text);
      } else {
        alert("Only numbers are allowed");
      }
    }} //set LL1
  />
</View>
{/* Row 2 - Foresite a*/}
<View style={styles.row}>
  <InputBar
    style={styles.stationField}
    placeholder="Foresight"
    value={description_2}
    multiline={true}
    onChangeText={(text) => setDescription_2(text)}
  />
  <Text style={styles.desc}>LL </Text>
  <InputBar
    style={styles.stationField}
    placeholder="000.00.00"
    dataType="number"
    maxLength={11}
    value={bearingLL2}
    onEndEditing={(text) => {
      formatBearing(text);
    }}
    onChangeText={(text) => {
      if (/^\d+$/.test(text) || text === "") {
        setBearingLL2(text);
      } else {
        alert("Only numbers are allowed");
      }
    }} //SET LL2
  />
</View>
{/* Row 3 - foresite b */}
<View style={styles.row}>
  <InputBar
    style={styles.stationField}
    placeholder="Foresight"
    value={description_2}
    multiline={true}
    editable={false}
  />
  <Text style={styles.desc}>RR </Text>
  <InputBar
    style={styles.stationField}
    placeholder="000.00.00"
    dataType="number"
    maxLength={11}
    value={bearingRR1}
    onEndEditing={(text) => {
      formatBearing(text);
    }}
    onChangeText={(text) => {
      if (/^\d+$/.test(text) || text === "") {
        setBearingRR1(text);
      } else {
        alert("Only numbers are allowed");
      }
    }} //SET RR1
  />
</View>
{/* Row 4  - backsite b*/}
<View style={styles.row}>
  <InputBar
    style={styles.stationField}
    placeholder="Backsight"
    value={description_1}
    multiline={true}
    editable={false}
  />
  <Text style={styles.desc}>RR </Text>
  <InputBar
    style={styles.stationField}
    placeholder="000.00.00"
    dataType="number"
    maxLength={11}
    value={bearingRR2}
    onEndEditing={(text) => {
      formatBearing(text);
    }}
    onChangeText={(text) => {
      if (/^\d+$/.test(text) || text === "") {
        setBearingRR2(text);
      } else {
        alert("Only numbers are allowed");
      }
    }} //SET RR2
  />
</View>
<Text style={styles.distanceLabel}>{"Distance (Ft)"}</Text>
<InputBar
  style={styles.stationField}
  placeholder="xxx.xxx"
  value={station}
  onChangeText={(text) => setStation(text)}
  width={200}
/>
{/* ================================================================= */}
<View style={styles.buttonsTab}>
  <CustomButton
    color={colors.primaryColor}
    type="outline"
    text={"Clear All"}
    width="80%"
    onclick={clearFields}
  />
  {/* butotn to update a traverse sheet when the user selects from the dropdown */}
  <CustomButton
    color={colors.primaryColor}
    type="outline"
    text={"Update"}
    width="80%"
    onclick={updateItem}
  />
  {/* the next button */}
  <CustomButton
    color={colors.primaryColor}
    type="outline"
    text={"Next"}
    width="80%"
    onclick={next}
  />
</View>

{/* Button to navigate to the next screen after all traverse data is inputted */}
<CustomButton
  color={colors.primaryColor}
  text={"Done"}
  width={370}
  onclick={handleDone}
/>