import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useGlobalSettingContext } from "../../context/GlobalSettingContext";
import { useThemeContext } from "../../context/ThemeContext";
import { CountryDetails } from "../../types/CountryDetails.type";
import { formatDataCountryLabels } from "../../utils";
import { ClockListRowType } from "../ClockList/ClockList";
import CountryBadge from "../country-badge/CountryBadge";
import CountryCard from "../countryCard/CountryCard";
import Modal, { ModalProps } from "../modal/Modal";
import "./preference-setting-modal.scss";

export interface PreferenceSettingModalProps extends ModalProps {}

type ClockListRowKeyType = keyof ClockListRowType;

const PreferenceSettingModal: React.FC<PreferenceSettingModalProps> = (props: PreferenceSettingModalProps) => {
  const { theme } = useThemeContext();
  const { countryList, isFetchingCountryList, localStorageData, storeHomeTimezoneData, removeLocalStorage } = useGlobalSettingContext();
  const [pickedTimezone, setPickedTimezone] = React.useState<CountryDetails[]>([]);
  const [countryNameInput, setCountryNameInput] = React.useState<string>("");
  const restructuredCountryList: CountryDetails[] = React.useMemo(() => formatDataCountryLabels(countryList), [countryList]);
  const filteredCountryList: CountryDetails[] = React.useMemo(() => {
    if (!!countryNameInput) {
      return restructuredCountryList.filter((country: CountryDetails) => country.searchLabel.toLocaleLowerCase().includes(countryNameInput.toLocaleLowerCase()));
    }
    return [];
  }, [countryNameInput, restructuredCountryList]);

  const onChangeCountryName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountryNameInput(event.target.value);
  };

  const onClickCountryCard = (data: CountryDetails) => {
    if (pickedTimezone.length === 6) {
      return;
    }
    if (pickedTimezone.find((country: CountryDetails) => country.timeZone === data.timeZone)) {
      return;
    }
    setPickedTimezone((prevCountryList: CountryDetails[]) => [...prevCountryList, data]);
  };

  const onClickCloseBadge = (index: number) => {
    const newPickedTimezone: CountryDetails[] = [...pickedTimezone];
    const removedTimezone: CountryDetails[] = [...newPickedTimezone.slice(0, index), ...newPickedTimezone.slice(index + 1)];
    if (removedTimezone.length === 0 && localStorageData) {
      removeLocalStorage();
    }
    setPickedTimezone(removedTimezone);
  };

  const onSave = () => {
    if (pickedTimezone.length === 6) {
      const restructurePickedTimezone: ClockListRowType = { firstRow: pickedTimezone.slice(0, 3), secondRow: pickedTimezone.slice(3, 5), thirdRow: pickedTimezone.slice(5) };
      storeHomeTimezoneData(restructurePickedTimezone);
      return;
    }
  };

  React.useEffect(() => {
    if (localStorageData) {
      const flatLocalDataCountryDetails: CountryDetails[] = (Object.keys(localStorageData) as Array<ClockListRowKeyType>)
        .map((key: ClockListRowKeyType) => localStorageData[key])
        .flat();
      setPickedTimezone(flatLocalDataCountryDetails);
    }
  }, [localStorageData]);

  return (
    <Modal toggle={props.toggle} onModalClose={props.onModalClose} className="preference-setting-modal">
      <div className="custom-modal-header">
        <div>
          <h4 className="mb-0">Prefered timezone</h4>
          <div>
            <small>This changes will be reflected in homepage</small>
          </div>
        </div>
        <AiOutlineClose onClick={props.onModalClose} />
      </div>
      <div className="custom-modal-body">
        <div className={`country-badges-wrapper ${theme.nav}`}>
          <div className="country-badges-container">
            {pickedTimezone.map((timezone: CountryDetails, index: number) => (
              <CountryBadge key={index} type={theme.bgBody === "bg-dark" ? "bg-light" : "bg-dark"} text={timezone.label} onClose={() => onClickCloseBadge(index)} />
            ))}
          </div>
          <input
            value={countryNameInput}
            onChange={onChangeCountryName}
            type="text"
            className={`form-control ${theme.nav} ${theme.text} size-sm`}
            placeholder="Eg: Kuala Lumpur"
            disabled={isFetchingCountryList}
          />
        </div>
        <div>
          <div className="country-card-container">
            {filteredCountryList.map((countryTimeZone: CountryDetails, index: number) => (
              <CountryCard key={index} countryName={countryTimeZone.label} timeZone={countryTimeZone.timeZone} onClickCountryCard={() => onClickCountryCard(countryTimeZone)} />
            ))}
          </div>
        </div>
      </div>
      <div className="custom-modal-footer">
        <button className="btn btn-outline-primary" onClick={props.onModalClose}>
          Discard
        </button>
        <button className="btn btn-primary" onClick={onSave} disabled={pickedTimezone.length < 6}>
          Save
        </button>
      </div>
    </Modal>
  );
};

export default PreferenceSettingModal;
