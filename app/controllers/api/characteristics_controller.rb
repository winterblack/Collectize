class Api::CharacteristicsController < ApplicationController

  def create
    @characteristic = Characteristic.create!(characteristic_params)
    render json: @characteristic
  end

  def show
    @characteristic = Characteristic.find(params[:id])
  end

  def destroy
    @characteristic = Characteristic.find(params[:id])
    @characteristic.destroy
    render json: @characteristic
  end

  private

  def characteristic_params
    params.require(:characteristic).permit(:name, :collection_id)
  end
end
