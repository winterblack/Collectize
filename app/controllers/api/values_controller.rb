class Api::ValuesController < ApplicationController
  def create
    @value = Value.create!(value_params)
    render json: @value
  end

  def update
    @value = Value.find(params[:id])
    @value.update(value_params)
    render json: @value
  end

  private

  def value_params
    params.require(:value).permit(:value, :characteristic_id, :item_id)
  end
end
